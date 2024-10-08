export interface FormLoginSectionProps{
    email: string;
    validatedEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    validateEmail: boolean;
    onSignIn: () => void;
    handleRegister: () => void;
}
