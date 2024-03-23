export default {

    // convert form to name and value
    setFormData(data: any) {
        let formData = {};
        Object.keys(data).map((key) => {
            if (data[key].type === 'file') {
                let files = [] as any;
                if (data[key].value) {
                    data[key].value.forEach((item: any, key: number) => {
                        files[key] = item.getFileEncodeBase64String();
                    });
                }
                formData[key] = files;
            } else {
                formData[key] = data[key].value;
            }
        });
        return formData;
    }
}