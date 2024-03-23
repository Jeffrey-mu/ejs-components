export default function Svg({ rotate = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      className={
        rotate ? `transform transition duration-500 ease-in-out ${rotate}` : ''
      }
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m7 10l5 5l5-5"
      />
    </svg>
  )
}
