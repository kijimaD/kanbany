 require 'rails_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to test the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator. If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails. There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.

RSpec.describe "/statics", type: :request do
  # Static. As you add validations to Static, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    skip("Add a hash of attributes valid for your model")
  }

  let(:invalid_attributes) {
    skip("Add a hash of attributes invalid for your model")
  }

  describe "GET /index" do
    it "renders a successful response" do
      Static.create! valid_attributes
      get statics_url
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      static = Static.create! valid_attributes
      get static_url(static)
      expect(response).to be_successful
    end
  end

  describe "GET /new" do
    it "renders a successful response" do
      get new_static_url
      expect(response).to be_successful
    end
  end

  describe "GET /edit" do
    it "render a successful response" do
      static = Static.create! valid_attributes
      get edit_static_url(static)
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new Static" do
        expect {
          post statics_url, params: { static: valid_attributes }
        }.to change(Static, :count).by(1)
      end

      it "redirects to the created static" do
        post statics_url, params: { static: valid_attributes }
        expect(response).to redirect_to(static_url(Static.last))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Static" do
        expect {
          post statics_url, params: { static: invalid_attributes }
        }.to change(Static, :count).by(0)
      end

      it "renders a successful response (i.e. to display the 'new' template)" do
        post statics_url, params: { static: invalid_attributes }
        expect(response).to be_successful
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {
        skip("Add a hash of attributes valid for your model")
      }

      it "updates the requested static" do
        static = Static.create! valid_attributes
        patch static_url(static), params: { static: new_attributes }
        static.reload
        skip("Add assertions for updated state")
      end

      it "redirects to the static" do
        static = Static.create! valid_attributes
        patch static_url(static), params: { static: new_attributes }
        static.reload
        expect(response).to redirect_to(static_url(static))
      end
    end

    context "with invalid parameters" do
      it "renders a successful response (i.e. to display the 'edit' template)" do
        static = Static.create! valid_attributes
        patch static_url(static), params: { static: invalid_attributes }
        expect(response).to be_successful
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested static" do
      static = Static.create! valid_attributes
      expect {
        delete static_url(static)
      }.to change(Static, :count).by(-1)
    end

    it "redirects to the statics list" do
      static = Static.create! valid_attributes
      delete static_url(static)
      expect(response).to redirect_to(statics_url)
    end
  end
end