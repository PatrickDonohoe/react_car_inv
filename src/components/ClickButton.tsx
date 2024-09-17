import { Link } from "react-router-dom";

interface ClickButtonProps {
    icon: string,
    route: string,
    linkText: string,
    onClick: React.MouseEventHandler<HTMLAnchorElement>,
}

const ClickButton = (props: ClickButtonProps) => {
  return (
      <button className="p-1 md:p-3 m-2 md:m-5 bg-burgundy justify-center border-dark_red 
        border-2"
      >
        <Link 
          to={props.route} 
          onClick={props.onClick} 
          className="flex flex-col md:flex-row place-items-center lg:inline-block 
            text-ut_orange hover:text-white text-s md:text-md"
        >
            <i className={props.icon}></i> {props.linkText}
        </Link>
      </button>

  )
}

export default ClickButton
