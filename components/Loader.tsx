interface Props {
  show: boolean;
}

const Loader = ({ show }) => {
  return show ? <div className="loader"></div> : null;
};

export default Loader;
