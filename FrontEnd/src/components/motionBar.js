import React from 'react';

const getGreenAmount = (val) => {
  return parseInt(255 - (val * 2.55))
};

const getColor = (alt, cur) => alt ? `rgb(75, ${getGreenAmount(cur)}, 255)` : `rgb(255, ${getGreenAmount(cur)}, 0)`;

export default class MotionBar extends React.Component {

  render(){
    const { data } = this.props;
    return(
      <div
        style={{
          flex: 1,
          boxShadow: '0px 5px 5px -2.5px rgba(178, 174, 189, 1)',
          marginTop: 30
        }}
      >
        <div style={{alignSelf: 'center', letterSpacing: 2, textAlign: 'center'}}>
          {
            this.props.title
          }
        </div>
        <div style={{
          flex: 1,
          flexDirection: 'row',
          display: 'flex',
          marginTop: 20,
          padding: 5
        }}>
          {
            data.map((cur, index) => (
              <div
                onClick={() => this.props.onClickSecond(index)}
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  height: `${1 * cur}`,
                  backgroundColor: getColor(this.props.altColor, cur),
                  width: 'auto',
                  display: 'flex',
                  cursor: 'pointer',
                  borderRadius: 5
                }}
              />
            ))
          }
        </div>
      </div>
    );
  }
}
