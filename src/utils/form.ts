export default class Form {
    form: any; 
    constructor(form: object) {
        this.form = form;
    }

    fields() {
        return this.form;
    }

    setFormData(data: any) {
        Object.keys(data).map((key) => {
            this.form.value[key].value = data[key];
        });
    }

    getFormData() {
        let data = {};
        Object.keys(this.form.value).map((key) => {
            if (this.form.value[key].type === 'file') {
                let files = [] as any;
                if (this.form.value[key].value) {
                    this.form.value[key].value.forEach((item: any, key: number) => {
                        files[key] = item.getFileEncodeBase64String();
                    });
                }
                data[key] = files;
            } else {
                data[key] = this.form.value[key].value;
            }
        });
        return data;
    }

    updateFormData(data: {name: string, value: string}) {
        this.form.value[data.name].value = data.value;
    }

    setErrors(data: object) {
        this.form.value['errors'] = data;
    }

    setLoading(isLoad: boolean = false) {
        this.form.value.loading = isLoad;
    }

    getLoading() {
        return this.form.value.loading;
    }

    setOptions(name: string, options: object) {
        this.form.value[name]['options'] = options;
    }
}