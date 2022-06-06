const sequelize = require('./../db/db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketArtwork = sequelize.define('basket_artwork', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    artworkId: { type: DataTypes.INTEGER },
});

const Artwork = sequelize.define('artwork', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
});

const News = sequelize.define('news', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequelize.define('type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Author = sequelize.define('author', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});


const ArtworkInfo = sequelize.define('artwork_infos', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
});

const TypeAuthor = sequelize.define('type_author', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Orders = sequelize.define('orders', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    complete: { type: DataTypes.BOOLEAN, defaultValue: false },
    mobile: { type: DataTypes.STRING(25), allowNull: false },
    name: { type: DataTypes.STRING(30), allowNull: false },
    address: { type: DataTypes.STRING(50), allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: true },
})

const OrderArtwork = sequelize.define('order_artwork', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    artworkId: { type: DataTypes.INTEGER, allowNull: false },
    orderId: { type: DataTypes.INTEGER, allowNull: false },
    count: { type: DataTypes.INTEGER, allowNull: false },
})

const Gallery = sequelize.define('gallery', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    address: { type: DataTypes.STRING(50), allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
})

const GalleryArtwork = sequelize.define('gallery_artwork', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    artworkId: { type: DataTypes.INTEGER, allowNull: false },
    galleryId: { type: DataTypes.INTEGER, allowNull: false },
    count: { type: DataTypes.INTEGER, allowNull: false },
})

User.hasOne(Basket);
Basket.belongsTo(User);



User.hasMany(Orders);
Orders.belongsTo(User,
    {
        foreignKey: { name: 'userId' },
        onDelete: 'CASCADE',
    }
);

Orders.hasMany(OrderArtwork);
OrderArtwork.belongsTo(Orders,
    {
        foreignKey: { name: 'orderId' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
);

Gallery.hasMany(GalleryArtwork);
GalleryArtwork.belongsTo(Gallery,
    {
        foreignKey: { name: 'galleryId' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
);

Basket.hasMany(BasketArtwork);
BasketArtwork.belongsTo(Basket);

Type.hasMany(Artwork);
Artwork.belongsTo(Type);

Type.hasMany(Artwork);
Artwork.belongsTo(Type);

Author.hasMany(Artwork);
Artwork.belongsTo(Author);



Artwork.hasMany(ArtworkInfo, { as: 'info' });
ArtworkInfo.belongsTo(Artwork);

Type.belongsToMany(Author, { through: TypeAuthor });
Author.belongsToMany(Type, { through: TypeAuthor });


module.exports = {
    User,
    Basket,
    BasketArtwork,
    Artwork,
    Type,
    Author,
    TypeAuthor,
    ArtworkInfo,
    Orders,
    OrderArtwork,
    News,
    Gallery,
    GalleryArtwork
}

