import AddLesson from '../../../../AddLesson';
import YoutubeMedia from './Youtube';

// interface MediaItemProps {
//   onCloseActivies: () => void;
// }

const MediaItem = () => {
  return (
    <div className='media-item'>
      <YoutubeMedia />
      <YoutubeMedia />
      <YoutubeMedia />
      <YoutubeMedia />
      <YoutubeMedia />
      <YoutubeMedia />
      <AddLesson />
    </div>
  );
};

export default MediaItem;
