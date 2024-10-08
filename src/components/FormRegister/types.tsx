export interface FormRegisterSectionProps{
    email: string;
    validatedEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    firstName: string;
    setFirstName: (firstName: string) => void;
    lastName: string;
    setLastName: (lastName: string) => void;
    confirmPassword : string;
    setConfirmPassword: (confirmPassword: string) => void;
    validateEmail: boolean;
    onRegister: () => void;
}
