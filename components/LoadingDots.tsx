import styles from "./loading-dots.module.css";

const LoadingDots = ({
  color = "#000",
  style = "small",
}: {
  color: string;
  style: string;
}) => {
  return (
    <div className={style == "small" ? styles.loading2 : styles.loading}>
      <div className="flex gap-x-4 items-center">
        En cours de génération
        <div>
          <span className="bg-green-700" />
          <span className="bg-green-700" />
          <span className="bg-green-700" />
        </div>
      </div>
    </div>
  );
};

export default LoadingDots;

LoadingDots.defaultProps = {
  style: "small",
};
