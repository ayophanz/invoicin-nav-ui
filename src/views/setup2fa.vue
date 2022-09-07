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
            <div>
                <input type="text" class="border-1 border-gray-400 rounded-md">
            </div>
            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Enable 2FA
            </button>
            <p>
                <a href="#" @click.stop="onSkip" class="text-sm hover:text-blue-400">
                    Reminder later
                </a>
            </p>
        </div>
    </ModalComponent>
</template>
<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import accountService from '../services/account';
import ModalComponent from '../components/modal.vue';
import router from '../router';

export default defineComponent({
    name: 'setupTwofa',
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

        const onSkip = () => {
            router.push({ name: 'dashboard' });
        }

        onMounted(() => {
            onLoadQRcode();
        });

        return {
            otp,
            secret,
            qrImage,
            onSkip
        }
    }
});
</script>