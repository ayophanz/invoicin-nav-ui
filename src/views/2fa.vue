<template>
    <ModalComponent :state="true" :onClose="false" :showClose="false">
        <form @submit.prevent="onVerify">
            <div>
                <div v-html="qrImage"></div>
                <input v-model="otp" type="text">
                <button type="submit">Authenticate</button>
            </div>
        </form>
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
        let   qrImage = '';

        const onVerify = () => {
            const data = { 'one_time_password': otp.value };
            accountService.twofa(data)
            .catch((error) => {
                console.log(error);
            });
        }

        const onLoadQRcode = () => {
            accountService.genTwofaQRcode()
            .then((response) => {
                console.log(response);
                qrImage = response.qr_image_url;
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
            qrImage,
            onVerify
        }
    }
});
</script>