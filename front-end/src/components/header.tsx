import { Avatar, Pressable } from "native-base";
import { useState } from "react";
import { useNavigate } from "react-router";
import { AuthPopup } from "./auth-popup";

export function Header() {
  const [showBox, setShowBox] = useState(false);
  let navigate = useNavigate();

  return (
    <>
      <div className="header">
        <img
          onClick={() => navigate("/")}
          src="https://results.eci.gov.in/ResultAcGenMar2022/img/logo.png"
          alt="logo"
        />
        <Pressable onPress={() => setShowBox((showBox) => !showBox)}>
          <Avatar
            bg="indigo.500"
            size={{ base: "md", md: "10" }}
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=8",
            }}
          >
            JB
          </Avatar>
        </Pressable>
      </div>
      {showBox && <AuthPopup setShowBox={setShowBox} />}
    </>
  );
}
