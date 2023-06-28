const Facebook = ({ color = '#0E76A8', size = 70, ...props }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
    >
      <rect width="44" height="44" rx="8" fill="white" />
      <path
        d="M28 13C28 12.4477 27.5523 12 27 12H25C23.6739 12 22.4021 12.5268 21.4645 13.4645C20.5268 14.4021 20 15.6739 20 17V20H18C17.4477 20 17 20.4477 17 21V23C17 23.5523 17.4477 24 18 24H20V31C20 31.5523 20.4477 32 21 32H23C23.5523 32 24 31.5523 24 31V24H26.2192C26.6781 24 27.0781 23.6877 27.1894 23.2425L27.6894 21.2425C27.8472 20.6114 27.3698 20 26.7192 20H24V17C24 16.7348 24.1054 16.4804 24.2929 16.2929C24.4804 16.1054 24.7348 16 25 16H27C27.5523 16 28 15.5523 28 15V13Z"
        fill="#3B5998"
      />
    </svg>
  )
}

export default Facebook
