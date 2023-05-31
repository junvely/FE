import LoadingSpinnerIcon from '../assets/img/loadingSpinner.gif';

function LoadingSpinner() {
  return (
    <div className='h-4/5 flex justify-center items-center'>
      <img src={LoadingSpinnerIcon} alt='loading-spinner'></img>
    </div>
  );
}

export default LoadingSpinner;
