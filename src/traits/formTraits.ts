export default {

    // convert form to name and value
    setFormData(data: any) {
        let formData = {};
        Object.keys(data).map((key) => {
            formData[key] = data[key].value;
        });
        return formData;
    }
}