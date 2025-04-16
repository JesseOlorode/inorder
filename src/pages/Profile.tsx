
import { AppLayout } from "@/components/app/app-layout";
import { ProfileContent } from "@/components/app/profile-content";
import { useEffect } from "react";

const Profile = () => {
  // Make sure to add a useEffect to track that we're on a valid authenticated page
  useEffect(() => {
    // This helps make sure the session isn't cleared during normal navigation
    sessionStorage.setItem("visited", "true");
  }, []);

  return (
    <AppLayout>
      <ProfileContent />
    </AppLayout>
  );
};

export default Profile;
