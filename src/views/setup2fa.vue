<template>
    <ModalComponent :state="true" :onClose="false" :showClose="false">
        <h4 class="text-center my-5 text-2xl">Set up Google Authenticator</h4>
        <div>
            <p class="text-center">Set up your two factor authentication by scanning the barcode below. Alternatively, you can use the code <strong>{{ secret }}</strong></p>
            <div v-cloak v-html="qrImage" class="flex justify-center">
            </div>
            <p class="text-center">You must set up your Google Authenticator app before continuing. You will be unable to login otherwise, to download the Google Authenticator app go to playstore (android) or  appstore (ios). </p>
        </div>
        <div class="text-center my-5">
            <div class="mt-3">
                <button @click="onTwoFaComplete" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Complete 2fa
                </button>
            </div>
        </div>
    </ModalComponent>
</template>
<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import accountService from '../services/account';
import ModalComponent from '../components/modal.vue';

export default defineComponent({
    name: 'setupTwofa',
    components: {
        ModalComponent,
    },
    setup() {
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

        const onTwoFaComplete = () => {
            accountService.store2faSecret({ twofa_secret: secret.value })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error.error);
            });
        }

        onMounted(() => {
            onLoadQRcode();
        });

        return {
            secret,
            qrImage,
            onTwoFaComplete
        }
    }
});
</script>