import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function withAddComponents(WrappedComponent) {
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
        <div className="flex flex-col w-[650px] min-h-[350px]">
          <div
            className="w-full flex justify-end font-bold cursor-pointer"
            onClick={this.props.closeModal}
          >
            x
          </div>
          <div className="w-full border-b border-b-[#5a5c69] text-xl text-[#5a5c69] font-medium">
            {this.renderTitle()}
          </div>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
}

export default withAddComponents;
