<template>
    <ModalComponent :state="true" :onClose="false" :showClose="false">
        <form @submit.prevent="onVerify">
            <input v-model="otp" type="text">
            <button type="submit">Authenticate</button>
        </form>
    </ModalComponent>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue';
import accountService from '../services/account';
import ModalComponent from '../components/modal.vue';

export default defineComponent({
    name: 'twofa',
    components: {
        ModalComponent,
    },
    setup() {
        const otp = ref(''); 

        const onVerify = () => {
            const data = { 'one_time_password': otp.value };
            accountService.twofa(data)
            .catch((error) => {
                console.log(error);
            });
        }

        return {
            otp,
            onVerify
        }
    }
});
</script>