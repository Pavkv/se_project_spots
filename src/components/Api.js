module.exports = class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    async _fetchResponse(endpoint, method, body) {
        return await fetch( `${this._baseUrl}\\${endpoint}`, {
            method: method || 'GET',
            body: body ? JSON.stringify(body) : undefined,
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': this._headers['Content-Type']
            }
        }).
        then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        });
    };

    getCards() {
        return this._fetchResponse('cards');
    }

    getUserInfo() {
        return this._fetchResponse('users/me');
    }

    editUserInfo(name, about) {
        return this._fetchResponse('users/me', 'PATCH', {name, about}).
        then(res => {
            return {
                name: res.name,
                about: res.about
            }
        });
    }

    addNewCard(name, link) {
        return this._fetchResponse('cards', 'POST', {name, link}).
        then(res => {
            return {
                name: res.name,
                link: res.link,
                id: res._id,
                isLiked: res.isLiked
            }
        })
    }

    deleteCard(id) {
        return this._fetchResponse(`cards/${id}`, 'DELETE');
    }

    likeCard(id) {
        const cardLike = `cards/${id}/likes`;
        return this.getCards().
        then(cards => cards.forEach(card => {
            if (card._id === id) {
                card.isLiked ? this._fetchResponse(cardLike, 'DELETE') :
                    this._fetchResponse(cardLike, 'PUT');
            }
        }));
    }

    editAvatar(avatar) {
        return this._fetchResponse('users/me/avatar', 'PATCH', {avatar}).
        then(res => {
            return {avatar: res.avatar}
        })
    }
}