<template>
    <ModalComponent :state="true" :onClose="false" :showClose="false">
            
            <div v-if="step2fa === 'generate-secret'">
                <h4 class="text-center my-5 text-2xl">Two Factor Authentication</h4>
                <div>
                    <p class="text-left">Two-Factor Authentication (2FA) works by adding an additional layer of security to your account. It requires an additional login credential - beyond just the username and password - to gain account access, and getting that second credential requires access to something that belongs to you.</p>
                </div>
                <div class="text-center my-5">
                    <div class="mt-3">
                        <button @click="onGenerateSecret" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Generate Secret Key to Enable 2FA
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="step2fa === 'generate-qrcode'">
                <h4 class="text-center my-5 text-2xl">Set up Google Authenticator</h4>
                <div>
                    <p class="text-left">1. Scan this QR code with your Google Authenticator App. Alternatively, you can use the code: <br><strong class="text-red-400">{{ secret }}</strong></p>
                    <div v-cloak v-html="qrImage" class="flex justify-center">
                    </div>
                    <p class="text-left">2. Enter the pin code from Google Authenticator app: </p>
                </div>
                <div>
                    <input type="text" v-model="optCode" class="rounded-md border border-gray-400">
                </div>
                <div class="text-center my-5">
                    <div class="mt-3">
                        <button @click="on2feEnable" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Enable 2fa
                        </button>
                    </div>
                </div>
            </div>

    </ModalComponent>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue';
import accountService from '../services/account';
import ModalComponent from '../components/modal.vue';
import router from '../router';

export default defineComponent({
    name: 'setupTwofa',
    components: {
        ModalComponent,
    },
    setup() {
        let qrImage = ref('');
        let secret  = ref('');
        let step2fa = ref('generate-secret');
        let optCode = ref('');

        const onGenerateSecret = async () => {
            await accountService.generate2faSecret()
            .then(() => {
                step2fa.value = 'generate-qrcode';
                onLoadQRcode();
            });
        }

        const onLoadQRcode = async () => {
            await accountService.genTwofaQRcode()
            .then((response) => {
                qrImage.value = response.qr_image_url;
                secret.value = response.secret;
            })
            .catch((error) => {
                console.log(error);
            });
        }

        const on2feEnable = async () => {
            await accountService.enable2fa({ optCode: optCode.value })
            .then(() => {
                router.push({ name: 'dashboard' });
            })
            .catch((error) => {
                console.log(error);
            });
        }

        return {
            step2fa,
            secret,
            qrImage,
            optCode,
            onGenerateSecret,
            on2feEnable,
        }
    }
});
</script>