import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faInstagram, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import shani from '../../img/Shani.jpg';  // Adjusted path to images
import ram from '../../img/Ram.jpg';
import ayush from '../../img/Ayush.jpg';
import nikhil from '../../img/Nikhil.jpg';


const teamMembers = [
  {
    name: "Shani Sharma",
    role: "Founder",
    img: shani,
    socialLinks: {
      twitter: "#",
      instagram: "#",
      github: "#",
      linkedin: "#",
    },
  },
  {
    name: "KRISH MODI",
    role: "Co-founder",
    img: ram,
    socialLinks: {
      twitter: "#",
      instagram: "#",
      github: "#",
      linkedin: "#",
    },
  },
  {
    name: "TRISCA BEN",
    role: "Finances",
    img: ayush,
    socialLinks: {
      twitter: "#",
      instagram: "#",
      github: "https://github.com/Ayush314932",
      linkedin: "#",
    },
  },
  {
    name: "TRISCA BEN",
    role: "Finances",
    img: nikhil,
    socialLinks: {
      twitter: "#",
      instagram: "#",
      github: "#",
      linkedin: "#",
    },
  },
];

const Team = () => {
  return (
    <div className="bg-gray-100 text-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">Meet Our Team</h1>
      <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="relative w-64 h-80 bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-3"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="grid grid-cols-2 gap-4 mb-4">
                {Object.entries(member.socialLinks).map(([platform, link]) => (
                  <a
                    key={platform}
                    href={link}
                    className="w-12 h-12 bg-white flex justify-center items-center rounded-full text-gray-600 hover:bg-blue-500 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={platform.charAt(0).toUpperCase() + platform.slice(1)}
                  >
                    {platform === "twitter" && (
                      <FontAwesomeIcon icon={faTwitter} />
                    )}
                    {platform === "instagram" && (
                      <FontAwesomeIcon icon={faInstagram} />
                    )}
                    {platform === "github" && <FontAwesomeIcon icon={faGithub} />}
                    {platform === "linkedin" && (
                      <FontAwesomeIcon icon={faLinkedin} />
                    )}
                  </a>
                ))}
              </div>
              <div className="text-white">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-sm font-light">{member.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;