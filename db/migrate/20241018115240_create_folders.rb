class CreateFolders < ActiveRecord::Migration[7.1]
  def change
    create_table :folders do |t|
      t.string :title
      t.string :description

      t.timestamps
    end
  end
end
