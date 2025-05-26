-- ========== Game Model ==========

-- Bosses (game object linked with user)
CREATE TABLE bosses (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
	domo_balance NUMERIC(12,4) NOT NULL DEFAULT 0
);

-- Safe ($SOL accumulator)
CREATE TABLE vaults (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	boss_id UUID UNIQUE REFERENCES bosses(id) ON DELETE CASCADE,
	level INTEGER NOT NULL DEFAULT 1,
	capacity NUMERIC(12,4) NOT NULL DEFAULT 1000,
	current_amount NUMERIC(12,4) NOT NULL DEFAULT 0,
	auto_claim BOOLEAN DEFAULT FALSE,
	last_claimed TIMESTAMPTZ
);

-- Base (slot manages)
CREATE TABLE bases (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	boss_id UUID UNIQUE REFERENCES bosses(id) ON DELETE CASCADE,
	level INTEGER NOT NULL DEFAULT 1,
	capacity INTEGER NOT NULL DEFAULT 3,
	extra_slots INTEGER NOT NULL DEFAULT 0
);

-- Professions (affect income and stability)
CREATE TABLE professions (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	name TEXT NOT NULL UNIQUE,
	income_multiplier NUMERIC(4,2) NOT NULL,
	stability_multiplier NUMERIC(4,2) NOT NULL
);

--Default profession
INSERT INTO professions (id, name, income_multiplier, stability_multiplier)
VALUES (
	'00000000-0000-0000-0000-000000000001',
	'Salaried employee',
	1.0,
	1.0
)
ON CONFLICT (name) DO NOTHING;

INSERT INTO professions (name, income_multiplier, stability_multiplier) VALUES
	('3D-модельер', 1.0, 1.0),
	('Изобретатель', 1.0, 1.0),
	('DJ', 1.0, 1.0),
	('Музыкальный продюсер', 1.0, 1.0),
	('IoT-разработчик', 1.0, 1.0),
	('Домашний хакер', 1.0, 1.0),
	('VR-разработчик', 1.0, 1.0),
	('Цифровой архитектор', 1.0, 1.0),
	('Мемолог', 1.0, 1.0),
	('Редактор', 1.0, 1.0),
	('СММщик', 1.0, 1.0),
	('Майнер', 1.0, 1.0),
	('Техно-энтузиаст', 1.0, 1.0),
	('Стример', 1.0, 1.0),
	('Игровой журналист', 1.0, 1.0),
	('Киберспортсмен', 1.0, 1.0),
	('Дизайнер NFT', 1.0, 1.0),
	('Иллюстратор', 1.0, 1.0),
	('Журналист', 1.0, 1.0),
	('Шпион', 1.0, 1.0),
	('Дрон-оператор', 1.0, 1.0),
	('Курьер будущего', 1.0, 1.0),
	('Фотоблогер', 1.0, 1.0),
	('Гейм-тестировщик', 1.0, 1.0),
	('Игровой блогер', 1.0, 1.0),
	('Сетевой инженер', 1.0, 1.0),
	('Пентестер', 1.0, 1.0),
	('Стрим-певец', 1.0, 1.0),
	('Лектор', 1.0, 1.0),
	('Обозреватель', 1.0, 1.0),
	('Ютуб-шеф', 1.0, 1.0),
	('Дегустатор', 1.0, 1.0),
	('Подкастер', 1.0, 1.0),
	('Радиоведущий', 1.0, 1.0),
	('Криптотрейдер', 1.0, 1.0),
	('Финансовый аналитик', 1.0, 1.0),
	('Инвестор', 1.0, 1.0),
	('Программист', 1.0, 1.0),
	('Аналитик', 1.0, 1.0),
	('Крипторазработчик', 1.0, 1.0),
	('DAO-оракул', 1.0, 1.0),
	('Футуролог', 1.0, 1.0),
	('Пиксельный стример', 1.0, 1.0),
	('Коллекционер 8-бит', 1.0, 1.0),
	('Блогер', 1.0, 1.0),
	('TikTokер', 1.0, 1.0),
	('Фотокорреспондент', 1.0, 1.0),
	('Вирусописатель', 1.0, 1.0),
	('Брутфорсер BIP39 passphrase', 1.0, 1.0),
	('Кодер на Rust', 1.0, 1.0),
	('Хакатонщик', 1.0, 1.0),
	('Легализованная гидропонная ферма', 1.0, 1.0),
	('Микроинженер', 1.0, 1.0),
	('Сборщик дронов', 1.0, 1.0),
	('Биотехник', 1.0, 1.0),
	('Исследователь ИИ', 1.0, 1.0),
	('ML-инженер', 1.0, 1.0),
	('Координатор DAO', 1.0, 1.0),
	('Смарт-контракт аудитор', 1.0, 1.0),
	('DApp разработчик', 1.0, 1.0),
	('DeFi-аналитик', 1.0, 1.0),
	('Оракул блокчейна', 1.0, 1.0),
	('Web3-бизнесмен', 1.0, 1.0),
	('Криптофермер', 1.0, 1.0),
	('Обзорщик на YouTube', 1.0, 1.0),
	('Танцор TikTok', 1.0, 1.0),
	('Инженер звука', 1.0, 1.0)
ON CONFLICT (name) DO NOTHING;

CREATE TABLE tools (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	name VARCHAR(75) UNIQUE NOT NULL,
	price INTEGER NOT NULL DEFAULT 0
);

INSERT INTO tools (name) VALUES
	('3D-принтер'),
	('DJ-пульт: DJ'),
	('Raspberry Pi'),
	('VR-гарнитура'),
	('*Библиотека мемов'),
	('SHA256 ASIC: Майнер'),
	('Геймерский ноутбук'),
	('Графический планшет'),
	('Диктофон'),
	('Дрон'),
	('Зеркальный фотоаппарат'),
	('Игровая консоль'),
	('Коммутатор + роутер'),
	('*Кольцевой микрофон'),
	('Миниатюрная плита'),
	('Микрофон и pop-фильтр'),
	('Мониторы с графиками'),
	('Ноутбук с терминалом'),
	('Оракул-шар'),
	('Ретро-консоль'),
	('Смартфон: Блогер'),
	('Настольный ПК'),
	('Терминал с отладкой'),
	('Гровер'),
	('Террариум с роботами'),
	('Терминал AI'),
	('Терминал DAO'),
	('Терминал Web3 блокчейна'),
	('Ферма GPU'),
	('Штатив с лампой'),
	('Электронный микшер')
ON CONFLICT (name) DO NOTHING;

-- Employees (units hired by the boss)
CREATE TABLE employees (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	boss_id UUID REFERENCES bosses(id) ON DELETE CASCADE,
	base_id UUID REFERENCES bases(id) ON DELETE CASCADE,
	name TEXT NOT NULL,
	level INTEGER NOT NULL DEFAULT 1,
	profession_id UUID REFERENCES professions(id),
	cooldown_until TIMESTAMPTZ,
	created_at TIMESTAMPTZ DEFAULT now(),
	tool_id UUID REFERENCES tools(id) ON DELETE CASCADE
);

CREATE TABLE inventory (
	owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	tool_id UUID NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
	count INTEGER NOT NULL DEFAULT 1,
	number_used INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE inventory
ADD CONSTRAINT valid_number_used
CHECK (
	number_used <= count
);