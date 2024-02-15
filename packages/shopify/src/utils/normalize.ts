import type { Page } from '@vercel/commerce/types/page';
import type { Product } from '@vercel/commerce/types/product';
import type { Cart, LineItem } from '@vercel/commerce/types/cart';
import type { Category } from '@vercel/commerce/types/site';

import type {
    Checkout,
    CheckoutLineItemEdge,
    Collection,
    Image,
    ImageConnection,
    Maybe,
    MoneyV2,
    Page as ShopifyPage,
    PageEdge,
    Product as ShopifyProduct,
    ProductOption,
    ProductVariantConnection,
    SelectedOption,
} from '../../schema';

import { colorMapper } from './colors';

const money = ({ amount, currencyCode }: MoneyV2) => {
    return {
        value: +amount,
        currencyCode,
    };
};

const normalizeProductOption = ({
  id,
  name: displayName,
  values,
}: ProductOption) => {
  return {
    __typename: 'MultipleChoiceOption',
    id,
    displayName: displayName.toLowerCase(),
    values: values.map((value) => {
      let output: any = {
        label: value,
      }
      if (displayName.match(/colou?r/gi)) {
        output = {
          ...output,
          hexColors: [colorMapper(value)],
        }
      }
      return output
    }),
  }
}

const normalizeProductImages = (images: ImageConnection, variants: {
    image?: Maybe<Image>;
    options: { displayName: string; values: { label: string }[] }[]
}[], options: { displayName: string; values: { label: string }[] }[])=>{
    const { edges  } = images;
    const colors = options?.find(o=>o.displayName === "color")?.values.map(v=>v.label);
    const imageIds = colors?.map((c)=>{
        const colorImageId = variants?.find(v=>{
            return v?.options?.find(o=>o.displayName === "color")?.values[0].label === c;
        })?.image?.id;
        return {
            imageId: colorImageId,
            color: c,
        };
    });
    return edges == null ? void 0 : edges.map(({ node: { url, ...rest } }) => ({
        url,
        ...rest,
        color: imageIds?.find((i) => i.imageId === rest.id)?.color || null,
    }));
};

const normalizeProductVariants = ({ edges }: ProductVariantConnection) => {
  return edges?.map(
    ({
      node: {
        id,
        image,
        selectedOptions,
        sku,
        title,
        priceV2,
        compareAtPriceV2,
        requiresShipping,
        availableForSale,
      },
    }) => {
      return {
        id,
        name: title,
        image,
        sku,
        price: +priceV2.amount,
        listPrice: +compareAtPriceV2?.amount,
        requiresShipping,
        availableForSale,
        options: selectedOptions.map(({ name, value }: SelectedOption) => {
          const options = normalizeProductOption({
            id,
            name,
            values: [value],
          })

          return options
        }),
      }
    }
  )
}

export function normalizeProduct({
  id,
  title: name,
  vendor,
  images,
  variants,
  description,
  descriptionHtml,
  handle,
  priceRange,
  options,
  metafields,
  ...rest
}: ShopifyProduct): Product {
    const _variants = variants ? normalizeProductVariants(variants) : [];
    const _options = options ? options.filter((o)=>o.name !== "Title").map((o)=>normalizeProductOption(o)) : [] // By default, Shopify adds a 'Title' name when there's only one option. We don't need it. https://community.shopify.com/c/Shopify-APIs-SDKs/Adding-new-product-variant-is-automatically-adding-quot-Default/td-p/358095
    return {
    id,
    name,
    vendor,
    path: `/${handle}`,
    slug: handle?.replace(/^\/+|\/+$/g, ''),
    price: money(priceRange?.minVariantPrice),
    images: normalizeProductImages(images, _variants, _options),
    variants: _variants,
    options: _options,
    description: description || '',
    ...(descriptionHtml && { descriptionHtml }),
    ...rest,
  }
}

export function normalizeCart(checkout: Checkout): Cart {
  return {
    id: checkout.id,
    url: checkout.webUrl,
    customerId: '',
    email: '',
    createdAt: checkout.createdAt,
    currency: {
      code: checkout.totalPriceV2?.currencyCode,
    },
    taxesIncluded: checkout.taxesIncluded,
    lineItems: checkout.lineItems?.edges.map(normalizeLineItem),
    lineItemsSubtotalPrice: +checkout.subtotalPriceV2?.amount,
    subtotalPrice: +checkout.subtotalPriceV2?.amount,
    totalPrice: checkout.totalPriceV2?.amount,
    discounts: [],
  }
}

function normalizeLineItem({
  node: { id, title, variant, quantity, customAttributes },
}: CheckoutLineItemEdge): LineItem {
  let customAttributesList: { key: string; value: string }[] = []

  if (customAttributes?.length > 0) {
    customAttributes.forEach(({ key, value }) => {
      if (typeof value === 'string') {
        customAttributesList?.push({ key, value })
      }
    })
  }

  return {
    id,
    variantId: String(variant?.id),
    productId: String(variant?.id),
    name: `${title}`,
    quantity,
    customAttributes: customAttributesList,
    variant: {
      id: String(variant?.id),
      sku: variant?.sku ?? '',
      name: variant?.title!,
      image: {
        url: variant?.image?.url || '/product-img-placeholder.svg',
      },
      requiresShipping: variant?.requiresShipping ?? false,
      price: variant?.priceV2?.amount,
      listPrice: variant?.compareAtPriceV2?.amount,
    },
    path: String(variant?.product?.handle),
    discounts: [],
    options: variant?.title == 'Default Title' ? [] : variant?.selectedOptions,
  }
}

export const normalizePage = (
  { title: name, handle, ...page }: ShopifyPage,
  locale: string = 'en-US'
): Page => ({
  ...page,
  url: `/${locale}/${handle}`,
  name,
  body: page.body ?? '',
})

export const normalizePages = (edges: PageEdge[], locale?: string): Page[] =>
  edges?.map((edge) => normalizePage(edge.node, locale))

export const normalizeCategory = ({
  title: name,
  handle,
  id,
}: Collection): Category => ({
  id,
  name,
  slug: handle,
  path: `/${handle}`,
})
