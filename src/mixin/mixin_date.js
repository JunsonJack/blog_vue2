export const mixin_date = {
    filters: {
        /**
         *格式化时间文本
         * @param {Date} time 时间
         * @param {String} format 文本格式
         *  Y 表示年份
         *  M 表示月份
         *  D 表示某日
         *  h 表示小时
         *  m 表示分
         *  s 表示秒
         *  w 表示星期几
         */
        format(time, format = 'YYYY-MM-DD HH:mm:ss') {
          let date = new Date(time)
          let o = {
            'M+': date.getMonth() + 1,
            'D+': date.getDate(),
            'H+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'w': '日一二三四五六'.charAt(date.getDay())
          };
    
          format = format.replace(/Y{4}/, date.getFullYear()).replace(/Y{2}/, date.getFullYear().toString().substring(2));
    
          let k, reg
          for (k in o) {
            reg = new RegExp(k);
            /* eslint no-use-before-define:0 */
            format = format.replace(reg, match);
          }
          function match(m) {
            return m.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length);
          }
    
          return format;
        }
      },
}