import { useState } from "react";
import BasicDocuments from "./BasicDocuments";
import MenuOperations from "./MenuOperations";
import SalonDocuments from "./SalonDocuments";
import Contract from "./Contract"
import Registrationsteps from "./Registrationsteps"; // Import Registrationsteps

const Register = () => {
    const [step, setStep] = useState(1);

    return (
        <div className="flex h-screen">
            {/* Left Navigation Steps (40%) */}
            <div className="w-3/9 h-full bg-gray-100 p-4">
                <Registrationsteps activeStep={step} setActiveStep={setStep} />
            </div>

            {/* Right Content (60%) */}
            <div className="w-6/9 p-6 overflow-y-auto  bg-gray-100">
                {step === 1 && <BasicDocuments goToNextStep={() => setStep(2)} />}
                {step === 2 && <MenuOperations goToNextStep={() => setStep(3)} />}
                {step === 3 && <SalonDocuments goToNextStep={() => setStep(4)} />}
                {step === 4 && <Contract />}
            </div>
        </div>
    );
};

export default Register;
