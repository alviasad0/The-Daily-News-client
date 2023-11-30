import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const HomepageModal = () => {
    const [showModal, setShowModal] = useState(false);
     const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowModal(true);
      // Show SweetAlert modal after 10 seconds
      Swal.fire({
        title: "Subscribe now for exclusive content!",
        imageUrl:
          "https://i.ibb.co/HVQ91PM/4953844.jpghttps://unsplash.it/400/200",
        imageWidth: 400,
        imageHeight: 200,
        showCancelButton: true,
        confirmButtonText: "Subscribe",
          cancelButtonText: "Cancel",
        
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/subscriptions");
        } else {
          setShowModal(false);
        }
      });
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  // No need to render anything in the main component
  return null;
};

export default HomepageModal;
