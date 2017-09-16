import { Colors } from './colors';

export default class ColorCache {
  static __mapping = {
    'noData': Colors.noData,
  };
  static __next = 0;

  static clearCache(){
    ColorCache.__mapping = {
      'noData': Colors.noData,
    };
    ColorCache.__next = 0;
  }

  static getColor(userName) {
    if(!ColorCache.__mapping[userName]){
      ColorCache.__mapping[userName] = Colors.userColors[
        Object.keys(Colors.userColors)[ColorCache.__next]
        ];
      ColorCache.__next++;
    }
    return ColorCache.__mapping[userName];
  }
}
