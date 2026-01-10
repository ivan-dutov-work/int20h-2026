// components/PentaminoIcon.jsx

interface PentaminoIconProps extends React.SVGProps<SVGSVGElement> {}
const PentaminoIcon = (props: PentaminoIconProps) => {
  return (
    <svg
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props} // This allows className="text-accent" to work
    >
      <path
        d="M13.3334 6.33996H6.66672V12.67H13.3334V6.33996Z"
        fill="currentColor"
      />
      <path d="M6.66659 12.67H0V19H6.66659V12.67Z" fill="currentColor" />
      <path d="M20 12.67H13.3334V19H20V12.67Z" fill="currentColor" />
      <path d="M6.6666 0H7.62939e-06V6.33H6.6666V0Z" fill="currentColor" />
      <path
        d="M20 9.53674e-07H13.3334V6.33H20V9.53674e-07Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default PentaminoIcon;
