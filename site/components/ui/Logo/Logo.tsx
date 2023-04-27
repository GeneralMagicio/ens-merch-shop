const Logo = ({ className = '', ...props }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="205"
    height="48"
    fill="none"
    {...props}
  >
    <path
      fill="#D1E4FF"
      d="M122.41 35v-7.86c.03-2.73-.03-4.89-.24-6.24l5.52 14.1h3.63l5.52-14.13c-.12 1.14-.21 2.97-.21 7.38V35h3.78V13.07h-3.78l-7.11 17.46-7.11-17.46h-3.66V35h3.66Zm21.444-7.41c0 4.71 2.88 7.8 7.17 7.8 3.57 0 6.36-2.13 6.99-5.28h-3.39c-.36 1.29-1.77 2.19-3.54 2.19-2.22 0-3.6-1.29-3.69-3.66h10.56v-1.11c0-4.71-2.61-7.8-6.93-7.8-4.26 0-7.17 3.09-7.17 7.86Zm3.6-1.29c.03-2.25 1.44-3.54 3.45-3.54 1.98 0 3.39 1.23 3.42 3.54h-6.87Zm22.952-6.18c-2.25-.51-4.8 0-5.7 1.8l-.21-1.71h-3.36V35h3.66v-7.2c0-2.88 1.53-4.5 4.17-4.5h1.44v-3.18Zm1.163 7.44c0 4.65 2.94 7.83 7.11 7.83 3.84 0 6.66-2.34 7.11-5.82h-3.48c-.42 1.68-1.77 2.55-3.39 2.55-2.28 0-3.69-1.71-3.69-4.56 0-2.88 1.44-4.59 3.72-4.59 1.59 0 2.94.84 3.36 2.58h3.45c-.39-3.48-3.06-5.82-6.78-5.82-4.35 0-7.41 3.18-7.41 7.83ZM192.394 35v-8.16c0-2.91 2.04-3.78 3.66-3.78 1.23 0 3.09.51 3.09 3.69V35h3.63v-9.12c0-3.69-1.74-6.15-5.55-6.15-2.1 0-3.87.87-4.83 2.34v-9.39h-3.66V35h3.66Z"
    />
    <g fill="#fff" clip-path="url(#a)">
      <path d="M5.593 11.294a5.761 5.761 0 0 1 1.877-2.07L20.656 0 7.145 22.38s-1.18-1.998-1.641-3.01a9.587 9.587 0 0 1 .089-8.076ZM.15 26.732a15.08 15.08 0 0 0 5.903 10.945l14.585 10.188S11.513 34.69 3.816 21.582a13.255 13.255 0 0 1-1.547-4.47 7.167 7.167 0 0 1 0-2.146c-.2.372-.59 1.135-.59 1.135a17.375 17.375 0 0 0-1.576 5.055 30.965 30.965 0 0 0 .047 5.576Zm37.186 1.774c-.472-1.011-1.641-3.01-1.641-3.01L22.208 47.865l13.186-9.219a5.761 5.761 0 0 0 1.877-2.069 9.59 9.59 0 0 0 .089-8.077l-.024.006Zm5.353-7.368a15.08 15.08 0 0 0-5.902-10.944L22.226 0s9.119 13.174 16.822 26.283a13.258 13.258 0 0 1 1.54 4.47 7.17 7.17 0 0 1 0 2.146c.2-.372.59-1.135.59-1.135a17.37 17.37 0 0 0 1.576-5.056 30.96 30.96 0 0 0-.04-5.575l-.025.005ZM66.875 33.951v-3.843h-8.997V25.26h8.144v-3.636h-8.144v-4.789h8.997v-3.843H53.82v20.96h13.055ZM88.635 33.951V12.992h-4.058v13.865l-8.673-13.864h-5.057V33.95h4.057V19.082l9.468 14.87h4.263ZM107.584 17.988c-.471-2.365-2.411-5.439-7.468-5.439-3.94 0-7.262 2.838-7.262 6.563 0 3.163 2.146 5.32 5.468 6l2.911.592c1.617.325 2.529 1.27 2.529 2.483 0 1.478-1.206 2.572-3.382 2.572-2.94 0-4.38-1.863-4.557-3.932l-3.763 1.005c.323 2.986 2.763 6.563 8.291 6.563 4.851 0 7.527-3.252 7.527-6.474 0-2.956-2.029-5.44-5.822-6.178l-2.91-.562c-1.53-.296-2.264-1.212-2.264-2.365 0-1.39 1.293-2.66 3.263-2.66 2.646 0 3.587 1.803 3.793 2.956l3.646-1.124Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h108v48H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default Logo
