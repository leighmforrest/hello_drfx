import { useEffect, useState } from "react";
import httpService from "../services/httpService";

const HomePage = () => {
  const [notes, setNotes] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await httpService.get("/")
      setNotes(response.data)
    })()
    
  }, [])
  
  return (
    <>
      <section>
        <p>Home Page</p>
      </section>
      <section style={{ backgroundColor: "seashell" }}>
        {notes}
      </section>
    </>
  );
};

export default HomePage;
