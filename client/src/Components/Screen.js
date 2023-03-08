import "./Screen.css";

const Screen = ({ value }) => {
  return (
    <div className="screen" mode="single" max={70}>
      <p>{value}</p>
    </div>
  );
};

export default Screen;