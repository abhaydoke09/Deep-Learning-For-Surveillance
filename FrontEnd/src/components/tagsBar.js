import React from 'react'
import ColorCache from '../colorCache';
import ReactTooltip from 'react-tooltip';
import ReactPopover from 'react-popover';

const formatToSec = (num) => {

  console.log(num);

  const mins = Math.floor(num/60);
  const seconds = num % 60;
  return ` ${mins < 10 ? '0' : ''}${mins}:${seconds < 10 ? '0' : ''}${seconds}  --  `
};


export default class TagsBar extends React.Component {
  constructor(){
    super();
    this.state = {
      openPopover: null
    };
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(cur){
    this.props.onClickSecond(cur);
    this.setState({openPopover: cur})
  }

  shouldRenderTag(cur) {
    const tags = this.props.data;
    return tags.filter(tag => tag.tStart <= cur && tag.tEnd >= cur)
  };

  getCurrentRange(cur){
    const start = cur - 10 > 0 ? 10 : Math.abs(cur - 0) + 1;
    const end = cur + 10 < this.props.vidLen ? 10 : this.props.vidLen - cur;

    return [...Array(Math.abs(start) + Math.abs(end)).keys()]
  }

  render(){

    const { vidLen } = this.props;

    return(
      <div style={{flex: 1}}>
        <div style={{flex: 1, flexDirection: 'row', height: 20, display: 'flex'}}>
          {
            [...Array(vidLen).keys()].map(cur => {

              const firstTag = this.shouldRenderTag(cur).find(tag => tag);
              const renderPopover = !!this.state.openPopover && (this.state.openPopover === cur);
              return (
                <ReactPopover
                  isOpen={renderPopover}
                  body={
                    <div>
                      <div style={{flex: 1, flexDirection: 'row', height: 35, width: 'auto', display: 'flex'}}>
                        {
                          renderPopover &&
                          this.getCurrentRange(cur).map(delta => {
                            const firstSubTag = this.shouldRenderTag(delta < 10 ? cur - delta : cur + delta ).find(tag => tag);
                            return (
                              <div
                                className="target"
                                onClick={() => this.handleSelect(delta < 10 ? cur - delta : cur + delta )}
                                style={{
                                  backgroundColor: ColorCache.getColor(firstSubTag ? firstSubTag.tag : 'noData'),
                                  height: 35,
                                  flex: 1,
                                  width: 10,
                                  border: '1px solid black',
                                  cursor: 'pointer'
                                }}
                                data-tip={`${formatToSec(cur+delta)} ${firstSubTag ? firstSubTag.tag : 'No significant event'}`}
                              >
                              </div>
                            )
                          })
                        }
                      </div>
                    <ReactTooltip/>
                    </div>
                  }
                  preferPlace="below"
                >
                  <div
                    className="target"
                    onClick={() => this.handleSelect(cur)}
                    style={{
                      backgroundColor: ColorCache.getColor(firstTag ? firstTag.tag : 'noData'),
                      height: 20,
                      flex: 1,
                      cursor: 'pointer'
                    }}
                    data-tip={`${formatToSec(cur)} ${firstTag ? firstTag.tag : 'No significant event'}`}
                  >
                  </div>
                </ReactPopover>
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
