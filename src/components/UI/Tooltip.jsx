const Tooltip = ({ children, content }) => {
    return (
      <div className="relative group">
        {children}
        <div className="absolute z-10 invisible group-hover:visible bg-amber-50 text-green-800 text-sm w-fit rounded-lg py-1 px-5 left-1/2 transform -translate-x-1/2 mb-1 shadow-lg border border-green-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {content}
          <svg
            className="absolute text-amber-50 h-2 w-full left-0 top-full"
            x="0px"
            y="0px"
            viewBox="0 0 255 255"
          >
            <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
          </svg>
        </div>
      </div>
    );
  };

  export default Tooltip;