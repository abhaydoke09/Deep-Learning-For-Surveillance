import React from 'react'
import ColorCache from '../colorCache';
import ReactTooltip from 'react-tooltip';
import ReactPopover from 'react-popover';

const formatToSec = (num) => {
  const mins = Math.floor(num/60);
  const seconds = num % 60;
  return ` ${mins < 15 ? '0' : ''}${mins}:${seconds < 15 ? '0' : ''}${seconds}  --  `
};

const getVal = (delta, cur) => {
  console.log(delta, cur);
  let res = 0;
    if(delta === 15){
      res = cur;
      }
    if(delta < 15){
      res = cur - (15 - delta);
      }
    if(delta > 15){
      res = cur + (delta - 15);
      }
  console.log(res);
  return res;
};

const shouldDarken = (played, current) => current >= played;

export default class TagsBar extends React.Component {
  constructor(){
    super();
    this.state = {
      openPopover: null
    };
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(cur){
    this.setState({openPopover: false});
    this.props.onClickSecond(cur);
    this.setState({openPopover: cur})
  }

  shouldRenderTag(cur) {
    const tags = this.props.data;
    return tags.filter(tag => tag.tStart <= cur && tag.tEnd >= cur)
  };

  getCurrentRange(cur){
    const start = cur - 15 > 0 ? 15 : Math.abs(cur - 0) + 1;
    const end = cur + 15 < this.props.vidLen ? 15 : this.props.vidLen - cur;

    return [...Array(Math.abs(start) + Math.abs(end)).keys()]
  }

  render(){

    const { vidLen } = this.props;

    return(
      <div style={{flex: 1, boxShadow: '0px 5px 5px -2.5px rgba(178, 174, 189, 1)'}}>
        <div style={{flex: 1, flexDirection: 'row', height: 20, display: 'flex'}}>
          {
            [...Array(vidLen).keys()].map(cur => {

              const firstTag = this.shouldRenderTag(cur).find(tag => tag);
              const renderPopover = !!this.state.openPopover && (this.state.openPopover === cur);
              return (
                <ReactPopover
                  isOpen={renderPopover}
                  body={
                    <div style={{marginTop: 30, flex: 1, boxShadow: '0px 5px 5px -2.5px rgba(178, 174, 189, 1)',}}>
                      <div style={{flex: 1, flexDirection: 'row', height: 35, width: 'auto', display: 'flex'}}>
                        {
                          renderPopover &&
                          this.getCurrentRange(cur).map(delta => {
                            const selectedCurrent = getVal(delta, cur);
                            const firstSubTag = this.shouldRenderTag(selectedCurrent).find(tag => tag);
                            return (
                              <div
                                className="target"
                                onClick={() => this.handleSelect(selectedCurrent)}
                                style={{
                                  backgroundColor: ColorCache.getColor(firstSubTag ? firstSubTag.tag : 'noData'),
                                  height: 50,
                                  opacity: 1,
                                  flex: 1,
                                  width: 15,
                                  border: '1px solid black',
                                  cursor: 'pointer'
                                }}
                                data-tip={`${formatToSec(selectedCurrent)} ${firstSubTag ? firstSubTag.tag : 'No significant event'}`}
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
                      backgroundColor: ColorCache.getColor(firstTag ? firstTag.tag : 'noData', cur),
                      height: 20,
                      flex: 1,
                      cursor: 'pointer',
                      opacity: shouldDarken(this.props.played, cur) ? 0.3 : 1,
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
