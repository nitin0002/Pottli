import { firebaseConfig } from "./firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";


  

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  
  const db = getFirestore(app);

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("notify-form");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const emailInput = document.getElementById("email");
      const email = emailInput.value;

      try {
        await addDoc(collection(db, "emails"), {
          email: email,
          timestamp: serverTimestamp()
        });
        console.log("Email saved successfully!");
        emailInput.value = "";
        const inputGroup = document.querySelector(".input-group");
        let successMessage = document.getElementById("success-message");
        if (!successMessage) {
          successMessage = document.createElement("p");
          successMessage.id = "success-message";
          successMessage.style.color = "green";
          inputGroup.insertAdjacentElement("afterend", successMessage);
        }
        successMessage.textContent = "Thank you! You will be notified when we launch.";
      } catch (error) {
        console.error("Error saving email:", error);
        document.getElementById("email-error").textContent = "There was an error saving your email. Please try again.";
      }
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    function updatePlaceholder() {
      const emailInput = document.getElementById("email");
      if (window.innerWidth  >= 780 && window.innerWidth <= 900) {
        emailInput.setAttribute("placeholder", "enter your email.......");
      } else {
        emailInput.setAttribute("placeholder", "Enter your email address");
      }
    }
  
    updatePlaceholder();
    window.addEventListener("resize", updatePlaceholder);
  
  });
  