import React from 'react'
import ColorCache from '../colorCache';
import ReactTooltip from 'react-tooltip';


export default class TagsBar extends React.Component {

  shouldRenderTag(cur) {
    const tags = this.props.data;
    return tags.filter(tag => tag.tStart <= cur && tag.tEnd >= cur)
  };

  render(){

    const { vidLen, onClickSecond } = this.props;

    return(
      <div style={{flex: 1}}>
        <div style={{flex: 1, flexDirection: 'row', height: 20, display: 'flex'}}>
          {
            [...Array(vidLen).keys()].map(cur => {

              const firstTag = this.shouldRenderTag(cur).find(tag => tag);

              return (
                <div
                  onClick={() => onClickSecond(cur)}
                  style={{
                  backgroundColor: ColorCache.getColor(firstTag ? firstTag.tag : 'noData'),
                  height: 20,
                  flex: 1,
                  cursor: 'pointer'
                }}
                data-tip={firstTag ? firstTag.tag : 'No significant event'}
                >

                </div>
              )
              }

            )
          }
        </div>
        <ReactTooltip />
      </div>
    )
  }
}
