import PropTypes from 'prop-types';
import { Utensils, FileText, Handshake, Bell, File } from 'lucide-react';

const RegistrationStep = ({ icon: Icon, title, description, active, onClick }) => {
    return (
        <div 
            className={`flex items-center space-x-4 bg-white p-4 mt-4 mb-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer 
                ${active ? "border-l-4 border-green-500" : ""}`} 
            onClick={onClick}
        >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${active ? "bg-green-500" : "bg-gray-300"}`}>
                <Icon className={`w-6 h-6 ${active ? "text-white" : "text-gray-600"}`} />
            </div>
            <div>
                <h3 className={`text-lg font-semibold ${active ? "text-green-800" : "text-gray-700"}`}>{title}</h3>
                {description && <p className="text-sm text-gray-500">{description}</p>}
            </div>
        </div>
    );
};

RegistrationStep.propTypes = {
    icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    active: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};

const Registrationsteps = ({ activeStep, setActiveStep }) => {
    return (
        <div >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Registration Process</h2>

            <RegistrationStep icon={Bell} title="Salon Information" description="Name, location, and contact number" active={activeStep === 1} onClick={() => setActiveStep(1)} />
            <RegistrationStep icon={Utensils} title="Menu and Operational Details" active={activeStep === 2} onClick={() => setActiveStep(2)} />
            <RegistrationStep icon={FileText} title="Salon Documents" active={activeStep === 3} onClick={() => setActiveStep(3)} />
            <RegistrationStep icon={Handshake} title="Partner Contract" active={activeStep === 4} onClick={() => setActiveStep(4)} />

            <div className="bg-white p-4 rounded-lg shadow-md mt-6 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-blue-500">
                        <File className="w-5 h-5" />
                        <span>Documents required for registration</span>
                    </div>
                    <span className="text-blue-500">&gt;</span>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center mt-6 mb-6">
                <span className="text-gray-700">Did someone refer you to this platform?</span>
                <a href="#" className="text-blue-500">Yes</a>
            </div>
        </div>
    );
};

Registrationsteps.propTypes = {
    activeStep: PropTypes.number.isRequired,
    setActiveStep: PropTypes.func.isRequired
};

export default Registrationsteps;
