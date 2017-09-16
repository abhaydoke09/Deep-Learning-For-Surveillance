import React from 'react'
import ColorCache from './colorCache';


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
                  width: `${1/vidLen}%`,
                  minWidth: 1,
                  height: 20,
                  flex: 1,
                  cursor: 'pointer'

                }}>

                </div>
              )
              }

            )
          }
        </div>
      </div>
    )
  }
}