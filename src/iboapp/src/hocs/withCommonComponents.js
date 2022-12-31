import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function withCommonComponents(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.renderTitle = this.renderTitle.bind(this);
    }

    renderTitle() {
      const pathname = window.location.pathname.slice(
        1,
        window.location.pathname.length
      );
      return (
        `${pathname.charAt(0).toUpperCase()}${pathname.slice(
          1,
          pathname.length
        )}` || "Anasayfa"
      );
    }

    render() {
      return (
        <div className="flex w-full h-full">
          <Sidebar />
          <div className="w-full h-full bg-[#f8f9fc]">
            <Header />
            <div className="m-5">
              {/* <span className="text-xl font-medium text-[#5a5c69]">
                {this.renderTitle()}
              </span> */}
              <WrappedComponent {...this.props} />
            </div>
          </div>
        </div>
      );
    }
  };
}

export default withCommonComponents;
