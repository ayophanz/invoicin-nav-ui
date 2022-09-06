<template>
    <ModalComponent :state="true" :onClose="false" :showClose="false">
        <h4 class="text-center my-5 text-2xl">Set up Google Authenticator</h4>
        <div>
            <p>Set up your two factor authentication by scanning the barcode below. Alternatively, you can use the code <strong>{{ secret }}</strong></p>
            <div v-cloak v-html="qrImage" class="flex justify-center">
            </div>
            <p>You must set up your Google Authenticator app before continuing. You will be unable to login otherwise</p>
        </div>
        <div class="text-center my-5">
            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Complete Registration
            </button>
        </div>
    </ModalComponent>
</template>
<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import accountService from '../services/account';
import ModalComponent from '../components/modal.vue';

export default defineComponent({
    name: 'twofa',
    components: {
        ModalComponent,
    },
    setup() {
        const otp     = ref('');
        let   qrImage = ref('');
        let   secret  = ref('');

        const onLoadQRcode = () => {
            accountService.genTwofaQRcode()
            .then((response) => {
                qrImage.value = response.qr_image_url;
                secret.value = response.secret;
            })
            .catch((error) => {
                console.log(error);
            });
        }

        onMounted(() => {
            onLoadQRcode();
        });

        return {
            otp,
            secret,
            qrImage,
        }
    }
});
</script>