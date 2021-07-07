import CircularProgress from '@material-ui/core/CircularProgress';
import './../../../../assets/styles/main.scss';
const Preloader = () => {
  return (
    <div className="preloader__wrapper">
      <CircularProgress />
    </div>
  );
};

export default Preloader;
