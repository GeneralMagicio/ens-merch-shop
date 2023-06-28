import { useState } from 'react';
import { Share } from '@components/icons';
import Modal from '@components/ui/Modal';
import ProductShareModal from '@components/product/ProductSidebar/ProductShareModal';

const ProductShareButton = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<div
				onClick={() => setIsOpen(true)}
				className='flex items-center cursor-pointer'
			>
				<span className='mr-1'>Share this</span>
				<Share />
			</div>
			{isOpen && (
				<Modal onClose={() => setIsOpen(false)}>
					<ProductShareModal />
				</Modal>
			)}
		</>
	);
};

export default ProductShareButton;
