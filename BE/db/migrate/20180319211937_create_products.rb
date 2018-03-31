class CreateProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :products do |t|
      t.string :title
      t.text :description
      t.string :url
      t.string :votes
      t.string :submitterAvatarUrl
      t.string :productImageUrl

      t.timestamps
    end
  end
end
