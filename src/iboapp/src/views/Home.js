import React from "react";
import withCommonComponents from "../hocs/withCommonComponents";

function Home() {
  return (
    <div>
      <text style={{ color: "black", fontSize: 30 }}>
        OZGUN TARIM GIDA HAYVANCILIK NAKLIYAT SANAYI VE TICARET LTD. STI.
      </text>
    </div>
  );
}

export default withCommonComponents(Home);
