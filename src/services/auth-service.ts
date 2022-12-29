import { reactive, ref } from "vue";
import { useGetAccountByEmailQuery } from "../graphql/generated";
import { compare } from "../utils";
import { Account } from "../components/accounts/Account";
import router from '../router'

export let errorMessage = ref('')
let account: Account | null = reactive(new Account())

export const authorizeUser = async(email: string, password: string) => {
  const { onResult } = useGetAccountByEmailQuery({ email });

  onResult(async(result) => {
    account = result.data.accounts.length ? result.data.accounts[0] : null;

    if(account) {
      const passwordValid = compare(password, account.password);
      
      if(passwordValid){
        await router.push('/expenses');
      } else {
        errorMessage.value = 'Wrong email or password'
      }
    } else {
      errorMessage.value = 'Forbidden access'
    }
    // console.log('new')
    // const { mutate: createAccount, onDone } = useAddAccountMutation({});

    // const hashPassword = encrypt(password);
    // createAccount({
    //   email,
    //   password: hashPassword
    // })

    // onDone(async(result) => {
    //   const accountID = result.data?.createAccount?.id;
    //   console.log(accountID)
    //   account = new Account({
    //     id: accountID,
    //     email,
    //     password: '',
    //   });
    //   await router.push('/expenses');
    // });
  })
}