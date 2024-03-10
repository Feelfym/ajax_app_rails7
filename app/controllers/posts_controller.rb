class PostsController < ApplicationController
  def index
    @posts = Post.order(id: "DESC")
  end

  def new
  end

  def create
    # 新たに投稿されたメモの内容を変数postに格納
    post = Post.create(content: params[:content])
    # レスポンスとして返却されるデータフォーマットはjsonに指定する
    render json:{ post: post }
    # postキーとセットで、変数postに格納した値をJavaScriptに送信
  end
end
