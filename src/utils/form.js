export default class Forms {
    constructor(data) {
        // this.initData  = {};
        // this.fields    = {};
        // this.options   = {};
        // this.extraAttr = {};
        // this.labels    = {};
        // this.init(data);
        this.fields = [];
        this.init(data);
    }

    init(data) {
      Object.keys(data).forEach((key) => {
        const props = {
          name: key,
          label: data[key]['label'],
          value: data[key]['value'],
          type: data[key]['type'],
        }
        this.fields.push(props);
      });
    }

    // init(data) {
    //     Object.keys(data).forEach((key) => {
    //       this.initData[key] = data[key].value;
    //       if (typeof data[key] === 'string') {
    //         this.setField(key);
    //         this.setFieldValue(key, data[key]);
    //         return;
    //       }
    //       this.setField(key, data[key].type);
    //       this.setFieldValue(key, data[key].value);
    //       if (data[key].type === 'select') {
    //         this.setOptions(key);
    //       }
    
    //       if (typeof data[key].attributes !== 'undefined') {
    //         this.setExtraAttr(key, data[key].attributes);
    //       }
    //       this.setLabels(key, data[key].label);
    //     });
    // }

    // setField(field, type = 'text') {
    //     this.fields[field] = type;
    // }

    // setFieldValue(field, value = '') {
    //     if (this.fields[field] === 'file') {
    //       if (!value) {
    //         this[field] = {};
    //       } else {
    //         this[field] = Object.assign({}, value);
    //       }
    //     } else {
    //       this[field] = value;
    //     }
    // }

    // setOptions(field, options = []) {
    //     this.options[field] = options;
    // }

    // setExtraAttr(field, attrs = {}) {
    //     this.extraAttr[field] = attrs;
    // }

    // getExtraAttr(field) {
    //   return this.extraAttr[field] ? this.extraAttr[field] : {};
    // }

    // setLabels(field, label) {
    //     this.labels[field] = label;
    // }
}