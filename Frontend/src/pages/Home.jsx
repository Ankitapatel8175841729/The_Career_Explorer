import React from "react";
import { auth } from "../context/Firebase";
import { onAuthStateChanged } from "firebase/auth";

import DecryptedText from "../components/DecryptedText.jsx";
import TextType from "../components/TextType.jsx";
import ShinyText from "../components/ShinyText.jsx";

import MyCard from "../components/Card.jsx";
import getUserData from "../DataBase/GetUser.jsx";

const Home = () => {
  const [userData, setUserData] = React.useState(null);
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserData(user.uid).then((data) => {
          setUserData(data);
        });
      } else {
        setUserData(null);
        console.log("No user is signed in.");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="container m-auto pt-3 min-vh-100">
        <div>
          <h1 style={{ cursor: "pointer" }}>
            <DecryptedText
              animateOn="both"
              className="revealed"
              text={userData ? userData.displayName : "Guest"}
            />
          </h1>

          <h3>
            <TextType
              text={[
                "Welcome to Career Explorer",
                "Your journey to success starts here",
                "Discover your potential with us",
                "Unlock new opportunities today",
                "Empower your future with knowledge",
              ]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />
          </h3>

          <h5>
            <ShinyText
              text={userData ? `${userData.email}` : "Login to explore more!"}
              speed={2}
              delay={0}
              color="#7b7272ff"
              shineColor="#ffffff"
              spread={125}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
            />
          </h5>
        </div>

        <div
          className="m-3 mt-5"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "space-around",
          }}
        >
          <MyCard
            image="/architecture.png"
            title="Architecture"
            description="Architecture is the art and science of designing and constructing buildings and structures."
            link="architecture"
          />
          <MyCard
            image="/dental.png"
            title="Dental"
            description="Dental refers to the field of dentistry, which is the branch of medicine focused on the teeth, gums, and mouth."
            link="dental"
          />
          <MyCard
            image="/engineering.png"
            title="Engineering"
            description="Engineering is the discipline of applying science, math, and creativity to design, build, and maintain structures, machines, systems."
            link="engineering"
          />
          <MyCard
            image="/law.png"
            title="Law"
            description="Law is a system of rules and principles enforced by social or governmental institutions to regulate behavior, maintain order, and ensure justice."
            link="law"
          />
          <MyCard
            image="/management.png"
            title="Management"
            description="Management is the process of planning, organizing, leading, and controlling resources to efficiently and effectively achieve specific organizational goals."
            link="management"
          />
          <MyCard
            image="/medical.png"
            title="Medical"
            description="Medical refers to the field of medicine, which involves the diagnosis, treatment, and prevention of diseases and medical conditions to maintain and improve health."
            link="medical"
          />
          <MyCard
            image="/pharma.png"
            title="Pharmacy"
            description="Pharmacy is the science and practice of preparing, dispensing, and reviewing drugs and providing additional clinical services to ensure the safe and effective use of medications."
            link="pharmacy"
          />
          <MyCard
            image="/research.png"
            title="Research"
            description="Research involves the systematic investigation and study of materials and sources to establish facts and reach new conclusions."
            link="research"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
