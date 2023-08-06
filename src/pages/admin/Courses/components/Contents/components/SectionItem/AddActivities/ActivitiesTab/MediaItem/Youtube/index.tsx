import { YoutubeOutlined } from '@ant-design/icons';
import './Youtube.scss';

type Props = {
  onClick?: () => void;
};

const YoutubeMedia = (props: Props) => {
  return (
    <div className='media-item__section youtubue' onClick={props.onClick}>
      <div className='media-item__section-icon'>
        <YoutubeOutlined />
      </div>
      <div className='media-item__section-content'>
        <h3 className='media-item__section-title'>Youtube</h3>
        <p className='media-item__section-desc'>Add a Youtube video in your course by pasting the url video</p>
      </div>
    </div>
  );
};

export default YoutubeMedia;
